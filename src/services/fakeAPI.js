/* eslint-disable eqeqeq */
export function fetchUser() {
  console.log('fetch user...');
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('fetched user');
      resolve(
        {
          data: {
            authToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJpYXQiOjE2MTUyMjAzMDMsInN1YiI6ImRlbW8ifQ.EzzHk4OIOhSULuBauA6xksedBf3KT8uAv11bMcK1qqY',
          },
          error: false,
        },
      );
    }, 1000);
  });
}

export function fetchGarden() {
  console.log('fetch garden...');
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('fetched garden');
      resolve(
        {
          data: [
            {
              id: 1,
              user_id: 1,
              name: 'Garden',
            },
          ],
          error: false,
        },
      );
    }, 1000);
  });
}

export function fetchGardenAreas({ plant_id = '', area_id = '' } = {}) {
  console.log('Fetching garden areas');
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('fetched areas');
      let data = [
        {
          id: 2,
          name: 'Pots table',
          length_cm: '',
          width_cm: '',
        },
        {
          id: 4,
          name: 'Frontyard Plot',
          length_cm: 200,
          width_cm: 200,
        },
        {
          id: 1,
          name: 'Backyard raised bed corner',
          length_cm: 134,
          width_cm: 134,
        },
        {
          id: 5,
          name: 'Raised bed with trellis north',
          length_cm: 55,
          width_cm: 238,
        },
        {
          id: 6,
          name: 'Raised bed with trellis south',
          length_cm: 55,
          width_cm: 238,
        },
        {
          id: 3,
          name: 'Backyard Plot #1',
          length_cm: 124,
          width_cm: 124,
        },
        {
          id: 40,
          name: 'Small perennials plot',
          length_cm: 78,
          width_cm: 78,
        },
      ];
      if (plant_id) {
        data = data.filter((i) => i.plant_id == plant_id);
      }
      if (area_id) {
        [data] = data.filter((i) => i.id == area_id);
      }
      resolve({
        data,
        error: false,
      });
    }, 1000);
  });
}

export function fetchPlants({ area_id = '', plant_id = '' } = {}) {
  console.log('Fetching plants');
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('fetched plants');
      let data = [
        {
          id: 5,
          name: 'Apple',
          garden_id: 1,
          area_id: 1,
        },
        {
          id: 7,
          name: 'Dill',
          garden_id: 1,
          area_id: 2,
        },
        {
          id: 4,
          name: 'Melon',
          garden_id: 1,
          area_id: 3,
        },
        {
          id: 3,
          name: 'Tomato',
          garden_id: 1,
          area_id: 1,
        },
        {
          id: 8,
          name: 'Pepper',
          garden_id: 1,
          area_id: 2,
        },
        {
          id: 10,
          name: 'Radish',
          garden_id: 1,
          area_id: 4,
        },
      ];
      if (area_id) {
        data = data.filter((i) => i.area_id == area_id);
      }
      if (plant_id) {
        [data] = data.filter((i) => i.id == plant_id);
      }
      resolve({ data, error: false });
    }, 1000);
  });
}

export function fetchNotes({ area_id = '', plant_id = '', note_id = '' } = {}) {
  console.log('Fetching notes');
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('fetched notes');
      let data = [
        {
          id: 1,
          user_id: 1,
          garden_id: 1,
          area_id: 4,
          plant_id: 5,
          content: '- Clean up the Garden Tools.\n- Take Inventory of Supplies.\n- Take a Peek at Your Garden and Flower Beds.\n- Divide Perennials.\n- Plant your Spring Cool Weather Seeds.\n- Start Seeds Indoor for Warm Weather Plants.',
          title: 'Chores',
        },
        {
          id: 8,
          user_id: 1,
          garden_id: 1,
          area_id: null,
          plant_id: 3,
          content: '',
          title: 'Tomatoes care',
        },
      ];
      if (area_id) {
        data = data.filter((i) => i.area_id == area_id);
      }
      if (plant_id) {
        data = data.filter((i) => i.plant_id == plant_id);
      }
      if (note_id) {
        [data] = data.filter((i) => i.id == note_id);
      }
      resolve({ data, error: false });
    }, 1000);
  });
}

export function fetchError() {
  console.log('Fetching erroneous response');
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('fetched error');
      resolve({
        data: new Error('Fetch error'),
        error: true,
      });
    }, 1000);
  });
}
