// dobbiamo imparare cosa scrivere dentro questo file di test

import { render, screen, fireEvent } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import HiddenSection from '../components/HiddenSection'

// cosa testeremo? facciamo una todo-list dei nostri test
// - testeremo che il componente si monti correttamente...
// ...cioè che ad esempio il titolo "Componente da testare" sia presente nel DOM
// - testeremo che il bottone ci sia nel DOM
// - testeremo che l'etichetta del bottone inizialmente sia 'MOSTRA'

// i test si suddividono in GRUPPI ("suites")
// facciamo una prima suite per verificare che il montaggio iniziale del componente
// sia corretto e come previsto
describe('Testing initial mounting', () => {
  // qui dentro inserisco i test individuali
  it('checks if component title is in the DOM', () => {
    // qui dentro scriviamo i 3-4 passaggi obbligati per ogni test
    // 1) montiamo il componente HiddenSection nel VIRTUAL DOM
    render(<HiddenSection />)
    // 2) individuare gli elementi che vogliamo recuperare
    // il titolo è presente all'avvio del componente, ha un valore di "Componente da testare"
    // e quindi userò il metodo getBy* (singolare) utilizzando getByText
    const title = screen.getByText('Componente da testare') // tornerebbe l'elemento anche con titolo "COMPONENTE da TESTARE"
    // 3) interazione con il titolo: non c'è in questo test
    // 4) verifica dei risultati
    expect(title).toBeInTheDocument()
  })

  //   cerchiamo un bottone all'avvio del componente HiddenSection
  it('checks if a button is present at mounting phase', () => {
    // qui dentro scriviamo i 3-4 passaggi obbligati per ogni test
    // 1) montiamo il componente HiddenSection nel VIRTUAL DOM
    render(<HiddenSection />)
    // 2) individuare gli elementi che vogliamo recuperare
    const button = screen.getByRole('button') // cerco un generico bottone
    // 3) salto la fase 3 (non ci devo ancora cliccare sopra)
    // 4) verifica delle aspettative
    expect(button).toBeInTheDocument()
  })
})

// ho finito la suite per il controllo generico del montaggio,
// ora ne facciamo un'altra per verificare lo "stato" del componente
describe('Testing state functionality', () => {
  it('checks the initial button label', () => {
    // 1)
    render(<HiddenSection />)
    // 2)
    const button = screen.getByText(/mostra/i)
    // 3)
    // 4)
    expect(button).toBeInTheDocument()
  })

  it('checks the absence of the card', () => {
    // 1)
    render(<HiddenSection />)
    // 2)
    // screen.queryByRole('img') // controllo l'esistenza dell'immagine
    // per verificare la presenza della card
    // metodo più preciso
    const image = screen.queryByAltText(/gattino/i)
    // 3)
    // 4)
    // image dovrebbe essere null! verifichiamo l'ASSENZA del gattino
    // expect(image).toBeNull()
    // alternativa
    expect(image).not.toBeInTheDocument()
  })
})

// ultima suite di test
describe('checks button functionality', () => {
  it('makes the cat appear if the button is pressed', () => {
    // 1)
    render(<HiddenSection />)
    // 2)
    // cerco il bottone
    const button = screen.getByText(/mostra/i)
    // 3)
    // ora clicco sul bottone 1 volta
    fireEvent.click(button)
    // 4)
    // cerco la card con il gattino
    // e aspettarmi che ci sia nel documento
    const image = screen.getByAltText(/gattino/i)
    expect(image).toBeInTheDocument()
  })
})
