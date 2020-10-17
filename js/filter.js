'use strict';

(() => {
  const FilterIds = {
    DEFAULT: "filter-default",
    RANDOM: "filter-random",
    DISCUSSED: "filter-discussed"
  };

  const picturesContainer = document.querySelector('.pictures');
  const filterForm = document.querySelector('.img-filters__form');

  const ACTIVE_FILTER_CLASS = 'img-filters__button--active';

  const sortByDiscussed = (photos) => photos.sort(compareCommentsCount);

  const compareCommentsCount = (current, previous) => {
    if (previous.comments > current.comments) {
      return 1;
    } else if (previous.comments < current.comments) {
      return -1;
    } else {
      return 0;
    }
  };

  const clearPicturesContainer = () => {
    const children = Array.from(picturesContainer.children);
    children.forEach((child) => {
      if (child.classList.contains('picture')) {
        child.remove();
      }
    });
  };

  const onFilterChange = (photos) => (evt) => {
    let photosToSort = Array.from(photos);
    const activeFilter = filterForm.querySelector(`.${ACTIVE_FILTER_CLASS}`);
    if (activeFilter) {
      activeFilter.classList.remove(ACTIVE_FILTER_CLASS);
    }

    evt.target.classList.add(ACTIVE_FILTER_CLASS);
    clearPicturesContainer();

    switch (evt.target.id) {
      case FilterIds.RANDOM:
        break;
      case FilterIds.DISCUSSED:
        window.data.renderPhotos(sortByDiscussed(photosToSort));
        break;
      default:
        window.data.renderPhotos(photos);
        break;
    }
  };

  window.filter = {
    onFilterChange
  };
})();
