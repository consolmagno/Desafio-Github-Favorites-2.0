export class Favorites {
  constructor(root) {
    this.root = document.querySelector(root)
    this.load()
  }

  load() {
    this.entries = [
      {
        login: 'consolmagno',
        name: 'Sofia Consolmagno',
        public_repos: '20',
        followers: '1'
      },
      {
        login: 'lucasfcm7',
        name: 'Lucas Felipe',
        public_repos: '30',
        followers: '20'
      }
    ]
  }
}

export class FavoritesView extends Favorites {
  constructor(root) {
    super(root)

    this.tbody = this.root.querySelector('table tbody')

    this.update()
  }

  update() {
    this.removeAlltr()

    this.entries.forEach(user => {
      const row = this.createRow()

      row.querySelector(
        '.user img'
      ).src = `https://github.com/${user.login}.png`
      row.querySelector('.user img').alt = `Imagem de ${user.login}`
      row.querySelector('.user a').href = `https://github.com/${user.login}`
      row.querySelector('.user p').textContent = user.name
      row.querySelector('.user span').textContent = user.login
      row.querySelector('.repositories').textContent = user.public_repos
      row.querySelector('.followers').textContent = user.followers

      this.tbody.append(row)
    })
  }

  createRow() {
    const tr = document.createElement('tr')
    const content = `
      <td class="user">
        <img
          src="https://github.com/consolmagno.png"
          alt="Imagem de consolmagno"
        />
        <a href="https://github.com/consolmagno">
          <p>Sofia Consolmagno</p>
          <span>/consolmagno</span></a
        >
      </td>
      <td class="repositories">20</td>
      <td class="followers">3</td>
      <td><button>Remover</button></td>
    `
    tr.innerHTML = content

    return tr
  }

  removeAlltr() {
    this.tbody.querySelectorAll('tr').forEach(tr => {
      tr.remove()
    })
  }
}
