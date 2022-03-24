const sortByCategory = (videoList, category) => {
  const sortByCategoryList = [...videoList];
  if (category) {
    return sortByCategoryList?.filter(
      (videoData) => videoData.categoryName === category
    );
  }
  return sortByCategoryList;
};

export { sortByCategory };
