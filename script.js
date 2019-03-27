class App {
  constructor(selector) {
    this.container = document.querySelector(selector) || document.body

    this.numberOfUsers = 10
    this.genderOfUsers = 'male' // this means both
    this.searchTerm = ''
    this.focusedElement = null
    this.users = null
    this.isLoading = false
    this.isError = false

    this.render()
  }

  loadUsers() {
    if(this.isLoading) return

    this.isLoading = true
    this.isError = false
    this.render()


    fetch(
      'https://randomuser.me/api' +
      '?results=' + this.numberOfUsers +
      '&gender=' + this.genderOfUsers
    )
      .then(response => response.json())
      .then(data => {
        this.users = data.results
        console.log(this)
        
      })
      .catch(() => this.isError = true)
      .finally(() => {
        this.isLoading = false
        this.render()
      })
  }

  render() {
    this.container.innerHTML = ''

    const formsDiv = document.createElement('div')

    const numberInput = this.renderInput('number', 'numberOfUsers')
    const textInput = this.renderInput('text', 'genderOfUsers')
    const loadButton = this.renderButton('Załaduj', this.loadUsers.bind(this))

    formsDiv.appendChild(numberInput)
    formsDiv.appendChild(textInput)
    formsDiv.appendChild(loadButton)

    this.container.appendChild(formsDiv)

    this.renderContent()
  }

  renderContent(){
    const renderUser = (user) => {
      const userDiv = document.createElement('div')

      const avatarDiv = document.createElement('div')
      const avatar = document.createElement('img')
      const dataDiv = document.createElement('div')
      const nameDiv = document.createElement('div')
      const emailDiv = document.createElement('div')

      nameDiv.innerText = `${user.name.first} ${user.name.last}`
      emailDiv.innerText = user.email
      avatar.setAttribute('src', user.picture.thumbnail)

      avatarDiv.appendChild(avatar)

      dataDiv.appendChild(nameDiv)
      dataDiv.appendChild(emailDiv)

      userDiv.appendChild(avatarDiv)
      userDiv.appendChild(dataDiv)

      return userDiv
    }

    const renderUsers = () => {
      const usersContainerDiv = document.createElement('div')

      this.users.forEach(
        user => usersContainerDiv.appendChild(renderUser(user))
      )
      
      return usersContainerDiv
    }

    const getContent = () => {
      if(this.isError){
        return document.createTextNode('Wystąpił błąd! Spróbuj ponownie.')
      }
      if(this.isLoading){
        return document.createTextNode('Ładuje...')
      }
      if(this.users === null){
        return document.createTextNode('Kliknij przycisk żeby załadować')
      }
      if(this.users && this.users.length === 0){
        return document.createTextNode('Nie ma żadnych użytkowników!')
      }
      if(this.users){
        return renderUsers()
      }
    }

    const div = document.createElement('div')

    div.appendChild(getContent())

    this.container.appendChild(div)
  }

  renderButton(label, onClick) {
    const button = document.createElement('button')

    button.innerText = label

    button.addEventListener(
      'click',
      onClick
    )

    return button
  }

  renderInput(type, propName) {
    const input = document.createElement('input')

    input.setAttribute('type', type)
    input.value = this[propName]

    input.addEventListener(
      'input',
      (event) => {
        this[propName] = event.target.value
        this.focusedElement = propName
        this.render()
      }
    )

    return input

    if (this.focusedElement === propName) input.focus()
  }
}