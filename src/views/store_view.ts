import Store from '../models/Store';
import imagesView from './image_view';

export default {
  render(store: Store) {
    return {
      id: store.id,
      name: store.name,
      latitude: store.latitude,
      longitude: store.longitude,
      about: store.about,
      contact: store.contact,
      opening_hours: store.opening_hours,
      images: imagesView.renderMany(store.images),
    };
  },
  renderMany(stores: Store[]) {
    return stores.map(store => this.render(store));
  },
};
