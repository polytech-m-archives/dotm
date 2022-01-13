const {
  DateTime
} = require('luxon');

const findProject = async (name, db) => {
  const projects = db.collection('projects');

  const query = {
    name
  };

  return projects.findOne(query);
};

const createProject = async (name, db) => {
  const projects = db.collection('projects');

  const document = {
    name,
    entries: []
  };

  await projects.insertOne(document);
};

const addEntry = async (name, date, minutes, comment, hashtags, db) => {
  const projects = db.collection('projects');

  const query = {
    name
  };

  const update = {
    $push: {
      entries: {
        date,
        minutes,
        comment,
        hashtags,
      }
    }
  }

  await projects.updateOne(query, update);
};

const findEntries = async (date, name, db) => {
  const projects = db.collection('projects');

  const agg = [{
    '$unwind': {
      'path': '$entries',
      'preserveNullAndEmptyArrays': false
    }
  }, {
    '$project': {
      'date': '$entries.date',
      'minutes': '$entries.minutes'
    }
  }, {
    '$match': {
      'date': {
        '$gte': date.toJSDate(),
        '$lt': date.plus({
          day: 1
        }).toJSDate(),
      }
    }
  }, {
    '$group': {
      '_id': {},
      'count': {
        '$sum': '$minutes'
      }
    }
  }];

  if (name) {
    agg.unshift({
      $match: {
        name
      }
    });
  }

  return await projects.aggregate(agg);
}

const findHashtags = async (hashtag, name, db) => {
  const projects = db.collection('projects');

  const agg = [
    {
      '$unwind': {
        'path': '$entries',
        'preserveNullAndEmptyArrays': false
      }
    }, {
      '$project': {
        'date': '$entries.date',
        'minutes': '$entries.minutes',
        'hashtags': '$entries.hashtags'
      }
    }, {
      '$match': {
        'hashtags': hashtag
      }
    }, {
      '$group': {
        '_id': {},
        'count': {
          '$sum': '$minutes'
        }
      }
    }
  ];

  if (name) {
    agg.unshift({
      $match: {
        name
      }
    });
  }

  return await projects.aggregate(agg);
}

module.exports = {
  findProject,
  createProject,
  addEntry,
  findEntries,
  findHashtags,
}
