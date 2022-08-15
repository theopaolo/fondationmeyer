function ProjectEntry(title,text,link,linkText,) {
  return `<div class="laureat">
      <div class="details">
        <h3>${title}</h3>
        <p>${text}</p>
      </div>
      <a class="aside" href="${link}">${linkText}</a>
    </div>`
}

module.exports = ProjectEntry