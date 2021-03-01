export function fetchUser() {
  console.log('fetch user...');
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('fetched user');
      resolve({
        name: 'Ringo Starr',
      });
    }, 1000);
  });
}

export function fetchPosts() {
  console.log('fetch posts...');
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('fetched posts');
      resolve([
        {
          id: 0,
          text:
            'I get by with a little help from my friends',
        },
        {
          id: 1,
          text:
            "I'd like to be under the sea in an octupus's garden",
        },
        {
          id: 2,
          text:
            'You got that sand all over your feet',
        },
      ]);
    }, 2000);
  });
}

export function fetchGardenAreas() {
  console.log('Fetching garden areas');
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('fetched areas');
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
  console.log('Fetching garden areas');
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('fetched areas');
      resolve({
        data: new Error('Fetch error'),
        error: true,
      });
    }, 2000);
  });
}
