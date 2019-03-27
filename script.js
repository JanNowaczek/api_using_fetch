class App {
  constructor(selector){
    this.container = document.querySelector(selector) || document.body

    this.numberOfUsers = 10
    this.genderOfUsers = 'male'
    this.searchTerm = ''
    this.focusedElement = null
    this.users = null
    this.isLoading = false
    this.isError = false

    this.render()
  }

  loadUsers(){
    if(this.isLoading) return

    this.isLoading = true
    this.isError = false
    
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
      .finally(() => this.isLoading = false)
  }

  render(){
    this.container.innerHTML = ''

    this.renderInput('number', 'numberOfUsers')
    this.renderInput('text', 'genderOfUsers')
    this.renderButton ('Załaduj', this.loadUsers.bind(this))
  }

  renderButton(label, onClick){
    const button = document.createElement('button')

    button.innerHTML = label

    button.addEventListener(
      'click',
      onClick
    )

    this.container.appendChild(button)

  }

  renderInput(type, propName){
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

    this.container.appendChild(input)

    if(this.focusedElement === propName) input.focus()
  }
}

