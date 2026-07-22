import mongoose from 'mongoose';
import logger from '../utils/logger.js';

const dailyMentorSchema = new mongoose.Schema(
  {
    conversationId: {
      // No index:true here — the compound index below covers all queries.
      // A field-level index would create a separate conversationId_1 index
      // which MongoDB can enforce as unique, causing E11000 on every second
      // message in the same conversation.
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['user', 'assistant'],
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Non-unique compound index — groups messages by conversation and orders them
// chronologically. This is the ONLY index on conversationId.
dailyMentorSchema.index({ conversationId: 1, createdAt: 1 });

const DailyMentor = mongoose.model('DailyMentor', dailyMentorSchema);

// ─────────────────────────────────────────────────────────────────────────────
// SELF-HEALING INDEX MIGRATION
//
// If a previous schema version created a standalone `conversationId_1` unique
// index (or a unique compound index), drop it safely so that multiple messages
// can share the same conversationId without triggering E11000.
// This runs once per server start, after the MongoDB connection is ready.
// Existing documents are never deleted — only the bad index is removed.
// ─────────────────────────────────────────────────────────────────────────────
mongoose.connection.once('open', async () => {
  try {
    const collection = mongoose.connection.collection('dailymentors');
    const indexes = await collection.indexes();

    // Find any index on conversationId (alone or in a unique compound)
    // that was created with unique:true
    for (const idx of indexes) {
      const keys = Object.keys(idx.key || {});
      const isOnConvId =
        keys.includes('conversationId') && keys.length === 1; // standalone field index
      const isUnique = idx.unique === true;

      if (isOnConvId && isUnique) {
        await collection.dropIndex(idx.name);
        logger.info(
          `DailyMentor: dropped stale unique index "${idx.name}" on conversationId.`
        );
      }
    }

    // Re-sync the correct (non-unique) indexes defined in this schema
    await DailyMentor.syncIndexes();
    logger.info('DailyMentor: indexes synced successfully (no unique constraint on conversationId).');
  } catch (err) {
    // Non-fatal — log and continue. The server must not crash over an index check.
    logger.warn(`DailyMentor: index migration warning — ${err.message}`);
  }
});

export default DailyMentor;

