'use strict';

(() => {
  const FilterIds = {
    DEFAULT: "filter-default",
    RANDOM: "filter-random",
    DISCUSSED: "filter-discussed"
  };

  const RANDOM_PHOTOS_AMOUNT = 10;

  const picturesContainer = document.querySelector('.pictures');
  const filterForm = document.querySelector('.img-filters__form');

  const ACTIVE_FILTER_CLASS = 'img-filters__button--active';

  const sortByDiscussed = (photos) => photos.sort((a, b) => b.comments.length - a.comments.length);

  const sortInRandomOrder = (photos) => shufflePhotos(photos).splice(RANDOM_PHOTOS_AMOUNT);

  const filter = {
    onFilterChange: () => {}
  };

  const shufflePhotos = (photos) => {
    for (let i = photos.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = photos[i];
      photos[i] = photos[j];
      photos[j] = temp;
    }
    return photos;
  };

  const clearPicturesContainer = () => {
    const children = Array.from(picturesContainer.children);
    children.forEach((child) => {
      if (child.classList.contains('picture')) {
        child.remove();
      }
    });
  };

  const changeActiveFilter = (evt) => {
    const activeFilter = filterForm.querySelector(`.${ACTIVE_FILTER_CLASS}`);
    if (activeFilter) {
      activeFilter.classList.remove(ACTIVE_FILTER_CLASS);
    }
    evt.target.classList.add(ACTIVE_FILTER_CLASS);
  };

  const applyFilter = (evt, photos) => {
    let photosToSort = Array.from(photos);

    clearPicturesContainer();

    switch (evt.target.id) {
      case FilterIds.RANDOM:
        sortInRandomOrder(photosToSort);
        break;
      case FilterIds.DISCUSSED:
        sortByDiscussed(photosToSort);
        break;
      default:
        break;
    }
    window.data.renderPhotos(photosToSort);
  };

  const onFilterClick = (evt) => {
    changeActiveFilter(evt);
    filter.onFilterChange(evt);
  };

  filterForm.addEventListener('click', onFilterClick);

  window.filter = {
    filterChangeHandler: (cb) => {
      filter.onFilterChange = cb;
    },
    applyFilter
  };
})();
