document.addEventListener('DOMContentLoaded', () => {
  fetch('data.json')
    .then(response => response.json())
    .then(data => {
      window.activitiesData = data;
      updateData('daily', document.querySelector('li.active')); // Default to daily view
    })
    .catch(error => console.error('Error fetching data:', error));
});

function updateData(timeframe, element) {
  const activities = window.activitiesData;

  // Remove active class from all list items
  document.querySelectorAll('#timeframe-list li').forEach(li => {
    li.classList.remove('active');
  });

  // Add active class to the clicked list item
  if (element) {
    element.classList.add('active');
  }

  activities.forEach(activity => {
    const activityId = activity.title.toLowerCase().replace(' ', '-');
    const activityElement = document.getElementById(activityId);

    if (activityElement) {
      activityElement.innerHTML = `
        <div class="data">
          <div class="data_icons">
            <img src="./images/icon-${activityId}.svg">
          </div>
          <div class="data_section">
            <div class="data_info">
              <div class="data_heading">
                <span>${activity.title}</span> <span class=""> <img src="./images/icon-ellipsis.svg" alt="elips"></span>
              </div>
              <div class="data_count">
                <span>${activity.timeframes[timeframe].current}hrs</span>
              </div>
              <div class="data_last_count">
                <span>Last ${timeframe} - </span> <span>${activity.timeframes[timeframe].previous}hrs</span>
              </div>
            </div>
          </div>
        </div>`;
    }
  });
}
