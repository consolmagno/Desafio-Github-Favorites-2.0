import { GithubUser } from './GithubUser.js'

export class Favorites {
  constructor(root) {
    this.root = document.querySelector(root)
    this.load()
  }

  load() {
    this.entries = JSON.parse(localStorage.getItem('@github-favorites:')) || []
  }

  save() {
    localStorage.setItem('@github-favorites:', JSON.stringify(this.entries))
  }

  async add(username) {
    try {
      const userExists = this.entries.find(entry => entry.login == username)

      if (userExists) {
        throw new Error('Usuário já castrado')
      }

      const user = await GithubUser.search(username)

      if (user.login === undefined) {
        throw new Error('Usuário não encontrado')
      }

      this.entries = [user, ...this.entries]
      this.update()
      this.save()
    } catch (error) {
      alert(error.message)
    }
  }

  delete(user) {
    const filteredEntries = this.entries.filter(
      entry => entry.login !== user.login
    )
    this.entries = filteredEntries
    this.update()
    this.save()
  }
}

export class FavoritesView extends Favorites {
  constructor(root) {
    super(root)

    this.tbody = this.root.querySelector('table tbody.add-users')

    this.emptyTbody = this.root.querySelector('table tbody.no-user')

    this.update()
    this.onadd()
  }

  Empty() {
    if (this.entries.length == 0) {
      this.emptyTbody.classList.remove('not_active')
    } else {
      this.emptyTbody.classList.add('not_active')
    }
  }

  onadd() {
    const addButton = this.root.querySelector('.search button')
    addButton.onclick = () => {
      const { value } = this.root.querySelector('.search input')

      this.add(value)
    }
  }

  update() {
    this.removeAlltr()
    this.Empty()

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
      row.querySelector('.remove').onclick = () => {
        const isOk = confirm('tem certeza que deseja deletar essa linha?')
        if (isOk) {
          this.delete(user)
        }
      }

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
      <td><button class="remove">Remover</button></td>
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
