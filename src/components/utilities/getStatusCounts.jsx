export const getStatusCounts = (ideas) => {
  return {
    all: ideas.length,
    approved: ideas.filter((idea) => idea.status === 'approved').length,
    pending: ideas.filter((idea) => idea.status === 'pending' || !idea.status)
      .length,
    rejected: ideas.filter((idea) => idea.status === 'rejected').length,
  };
};

export default getStatusCounts;
