export const fetchUsers = () => (
  $.ajax({
    method: 'GET',
    url: `/api/users`
  })
);

export const fetchUser = (userId) => (
  $.ajax({
    method: 'GET',
    url: `/api/users/${userId}`
  })
);

export const createUser = (user) => (
  $.ajax({
    method: 'POST',
    url: `/api/users`,
    data: {user}
  })
);

export const updateUser = (userId, user) => {
  return $.ajax({
    method: 'PATCH',
    url: `/api/users/${userId}`,
    data: {user}
  })
};

export const deleteUser = (userId) => (
  $.ajax({
    method: 'DELETE',
    url: `/api/users/${userId}`
  })
);