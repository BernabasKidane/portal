import mongoose from 'mongoose';
const quizSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
      },
      options: [
        {
          type: String,
          required: true,
        },
      ],
      correctAnswer: {
        type: String,
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );

const User = mongoose.model('Quiz', quizSchema);

export default User;