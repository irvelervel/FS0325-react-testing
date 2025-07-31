// dobbiamo imparare cosa scrivere dentro questo file di test

import { render, screen } from '@testing-library/react'
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
})
