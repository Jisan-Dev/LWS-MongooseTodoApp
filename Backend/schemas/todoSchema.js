const mongoose = require('mongoose');

const todoSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    status: { type: String, enum: ['active', 'inactive'] },
    date: { type: Date, default: Date.now() },
  },
  { timestamps: true }
);

// instance methods
todoSchema.methods = {
  findActive: function () {
    return mongoose.model('Todo').find({ status: 'active' });
  },
};

// static methods
todoSchema.statics = {
  findByJs: function () {
    return this.find({ title: /js/i }); //find title that has 'js' in it
  },
};

// query helpers
todoSchema.query = {
  byLanguage: function (language) {
    return this.find({ title: new RegExp(language, 'i') }); //new RegExp()
  },
};

module.exports = todoSchema;
