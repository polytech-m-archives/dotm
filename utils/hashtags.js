const extractHashtags = (comment) => {
  const regex = /#[A-z0-9]+/g;
  return `${comment}`.match(regex).map(hash => hash.replace('#', ''));
}

module.exports = {
  extractHashtags,
};
