---
pagination:
  data: beneficiaries
  size: 1
permalink: beneficiaries/{{ pagination.items }}/
---

{{> partials/head }}
{{> partials/nav }}

<h1>Bénéficiaries du {{ pagination.items }}</h1>

<ul>
{{#each beneficiaries.conservatoire as | year |}}
  <li>{{ @key }}
    <ul>
    {{#each year as | bene |}}
      <li>{{bene.Prénom}} {{ bene.Nom }}</li>
    {{/each}}
    </ul>
  </li>
{{/each}}

{{> partials/footer }}
{{> partials/foot }}
