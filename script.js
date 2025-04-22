const form = document.getElementById('doctorForm');
const profileList = document.getElementById('profileList');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const specialty = document.getElementById('specialty').value;
  const time = document.getElementById('time').value;
  const photo = document.getElementById('photo').files[0];

  const reader = new FileReader();
  reader.onload = function () {
    const card = document.createElement('div');
    card.className = 'profile-card';
    card.innerHTML = `
      <img src="${reader.result}" alt="Doctor Photo">
      <h3>${name}</h3>
      <p>${specialty}</p>
      <p>${time}</p>
    `;
    profileList.appendChild(card);
    form.reset();
  };
  reader.readAsDataURL(photo);
});
