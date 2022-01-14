const extractHashtags = (comment) => {
  if (!comment) return [];
  const regex = /#[A-z0-9]+/g;
  const match = `${comment}`.match(regex);
  if (!match || !match.length) return [];
  return match.map(hash => hash.replace('#', ''));
}

module.exports = {
  extractHashtags,
};
