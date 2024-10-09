const statusText = {
  1: "Новая",
  2: "В процессе - присвоен номер",
  3: "В процессе - запрос на устранение формальных недостатков",
  4: "В процессе - запрос на устранение существенных недостатков",
  5: "В процессе - запрос с датой принятия решения",
  6: "В процессе - органы, дающие заключение",
  7: "В процессе - вторая инстанция",
  8: "Подготовлен проект положительного решения",
  9: "Подготовлен проект отрицательного решения",
  10: "Решение подписано",
  11: "Для персонализации карт",
  12: "Карта готова к выдаче",
  13: "Документы готовы к выдаче",
  14: "Завершено",
  15: "Возобновлено",
  16: "Для архивирования WSC",
  17: "Архивировано WSC",
  18: "Для архивирования на предприятии",
  19: "Архивировано на предприятии",
  20: "Дело передано на временное хранение",
  21: "Приостановлено",
  22: "Заключение передано"
};
/*
const statusText = {
  1: "Nowa",
  2: "W toku - nadana sygnatura",
  3: "W toku - wezwanie o braki formalne",
  4: "W toku - wezwanie o braki merytoryczne",
  5: "W toku - wezwanie z terminem podjęcia decyzji",
  6: "W toku - organy opiniujące",
  7: "W toku - II instancja",
  8: "Przygotowany projekt decyzji pozytywnej",
  9: "Przygotowany projekt decyzji negatywnej",
  10: "Decyzja podpisana",
  11: "Do zlecenia personalizacji kart",
  12: "Karta do wydania",
  13: "Dokumenty do odbioru",
  14: "Zakończona",
  15: "Wznowiona",
  16: "Do archiwizacji WSC",
  17: "Zarchiwizowana WSC",
  18: "Do archiwizacji zakładowej",
  19: "Zarchiwizowana zakładowo",
  20: "Akta sprawy wypożyczone",
  21: "Zawieszona",
  22: "Opinia przekazana"
};
*/

fetch("https://inpol.mazowieckie.pl/api/foreigner/active-proceedings", {
  headers: {
    authorization: `Bearer ${sessionStorage.getItem("access_token")}`
  }
})
  .then(response => {
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Error 404: Resource not found");
      } else if (response.status === 500) {
        throw new Error("Error 500: Internal Server Error");
      } else {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
    }
    return response.json();
  })
  .then(cases => cases.map(case_ => {
    const statusDescription = statusText[case_.status] || `Unknown status: ${case_.status}`;
    return `Status of ${case_.signature} is ${case_.status} : ${statusDescription}`;
  }))
  .then(cases => cases.join("\n"))
  .then(result => console.log(result))
  .catch(error => console.error('Error:', error.message));
