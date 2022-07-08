---
pagination:
  data: beneficiaries
  size: 1
permalink: beneficiaries/{{ pagination.items }}/
---

<h1>Bénéficiaries du {{ pagination.items }}</h1>

<ul>
{% for year in beneficiaries.conservatoire %}
  <li>
    <ul>
    {% for bene in year %}
      <li>{{bene.Prenom}} {{ bene.Nom }}</li>
    {% endfor %}
    </ul>
  </li>
{% endfor %}
