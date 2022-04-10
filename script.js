let divResult = document.getElementById('fetch-result');

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

document.getElementById('fetch-button').addEventListener('click', async function (e) {
  e.preventDefault();

  divResult.innerHTML = '<p class="mt-4 text-slate-500">Загружаю данные...</p>';

  await sleep(500);

  const amount = document.getElementById('amount').value;
  const sorting = document.querySelector('input[name="sorting"]:checked').value;

  if (!amount) {
    return alert('Введите количество статей для вывода');
  }

  let promise = fetch(`https://api.dtf.ru/v1.9/timeline/mainpage/${sorting}?count=${amount}`)
    .then((response) => response.json())
    .then((json) => {
      const arr = json.result;
      divResult.innerHTML = '';

      for (let i = 0; i < amount; i++) {
        console.log(arr[i]);

        let div = document.createElement('div');
        div.className = 'flex flex-col p-6 mb-6 border border-slate-200 rounded';
        let divHeader = document.createElement('div');
        divHeader.className = 'flex flex-row items-start';
        let h4 = document.createElement('h4');
        let span = document.createElement('span');
        let p = document.createElement('p');
        let pLikes = document.createElement('p');
        let link = document.createElement('a');

        let subsite = arr[i].subsite.name;
        if (subsite !== '') {
          h4.innerHTML = `<span class="text-indigo-500">${subsite}</span> `;
        } else {
          h4.appendChild(document.createTextNode('Без подсайта 😒'));
        }
        h4.className = 'text-lg text-slate-600 mb-4 grow';
        divHeader.appendChild(h4);
        div.appendChild(divHeader);

        let title = arr[i].title;
        if (title !== '') {
          h4.appendChild(document.createTextNode(`${title}`));
        } else {
          h4.appendChild(document.createTextNode('В записи нет заголовка 😒'));
        }
        h4.className = 'text-lg text-slate-600 mb-4 grow';
        divHeader.appendChild(h4);
        div.appendChild(divHeader);

        let likes = arr[i].likes.summ;
        pLikes.appendChild(document.createTextNode(`+${likes}`));
        pLikes.className = 'text-teal-500 mb-4';
        divHeader.appendChild(pLikes);
        div.appendChild(divHeader);

        let intro = arr[i].intro;
        if (intro !== '') {
          p.appendChild(document.createTextNode(`${intro}`));
        } else {
          p.appendChild(
            document.createTextNode(
              'Описание отсутствует. Скорее всего, пост состоит из картинок.',
            ),
          );
        }
        p.className = 'text-base text-slate-500 mb-4';
        div.appendChild(p);

        let url = arr[i].url;
        link.href = url;
        link.title = 'Прочитать на сайте';
        link.target = '_blank';
        link.appendChild(document.createTextNode('Прочитать на сайте'));
        link.className =
          'px-4 py-2 rounded text-sky-500 border border-sky-500 hover:bg-sky-500 hover:text-white max-w-fit transition-all';
        div.appendChild(link);

        divResult.appendChild(div);
      }
    })
    .catch((error) => {
      console.log(error);
      divResult.innerHTML =
        '<p class="mt-4 text-slate-500">К сожалению, произошла какая-то ошибка. Попробуйте запросить данные ещё раз.</p>';
    });
});
