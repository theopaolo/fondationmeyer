function ProjectEntry(ProjectEntry) {
  return `<div class="laureat">
      <div class="details">
        <h3>${ProjectEntry.title}</h3>
        <p>${ProjectEntry.text}</p>
      </div>
      <a class="aside" href="${ProjectEntry.link}">${ProjectEntry.linkText}</a>
    </div>`
}
module.exports = ProjectEntry