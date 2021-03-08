export function fetchUser() {
  console.log('fetch user...');
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('fetched user');
      resolve(
        {
          authToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJpYXQiOjE2MTUyMjAzMDMsInN1YiI6ImRlbW8ifQ.EzzHk4OIOhSULuBauA6xksedBf3KT8uAv11bMcK1qqY',
        },
      );
    }, 1000);
  });
}

export function fetchGardenAreas() {
  console.log('Fetching garden areas');
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('fetched areas');
      resolve({
        data:
        [
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
        ],
        error: false,
      });
    }, 2000);
  });
}

export function fetchPlants() {
  console.log('Fetching plants');
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('fetched plants');
      resolve({
        data: [
          {
            id: 1,
            name: 'Backyard raised bed',
            length_cm: 135,
            width_cm: 150,
          },
          {
            id: 2,
            name: 'Backyard raised bed 2',
            length_cm: 125,
            width_cm: 130,
          },
        ],
        error: false,
      });
    }, 2000);
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
    }, 2000);
  });
}
