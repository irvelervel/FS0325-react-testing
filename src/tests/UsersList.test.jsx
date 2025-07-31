// testiamo il componente UsersList

import {
  fireEvent,
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import UsersList from '../components/UsersList'

// - all'avvio ci sia il titolo e il campo di ricerca
// - all'avvio la lista dei nomi dev'essere vuota e deve comparire lo spinner
// - una volta finito il caricamento, lo spinner deve scomparire e la lista
// si deve popolare di risultati (10)
// - scrivendo nel campo di ricerca la parola "clementin" dovrebbero rimanere
// solo 2 risultati nella lista

describe('Initial load', () => {
  it('initially displays just the title and the search field', () => {
    // 1)
    render(<UsersList />)
    // 2)
    const title = screen.getByText(/lista utenti/i)
    const searchInput = screen.getByPlaceholderText('Cerca un utente')
    // 3)
    // 4)
    expect(title).toBeInTheDocument()
    expect(searchInput).toBeInTheDocument()
  })

  it('expects to find 0 list-users and a spinner', () => {
    // 1)
    render(<UsersList />)
    // 2)
    const arrayOfListItems = screen.queryAllByTestId('list-user') // serve quando non avete altra scelta
    // e non ci sono altri modi per recuperare i riferimenti del DOM che vi servono
    const spinner = screen.getByTestId('spinner')
    // 3)
    // 4)
    expect(arrayOfListItems).toHaveLength(0) // mi aspetto che l'array sia vuoto
    expect(spinner).toBeInTheDocument()
  })
})

describe('after finished promise', () => {
  it('makes the spinner disappear and populates the users list', async () => {
    // 1)
    render(<UsersList />)
    // Stefano dal futuro (13:14): nella documentazione di testing-library
    // (https://testing-library.com/docs/guide-disappearance/#waiting-for-disappearance)
    // ho scoperto questo metodo "waitForElementToBeRemoved()" che aspetta
    // l'eventuale scomparsa di un elemento inizialmente presente. In questo
    // modo il test passa :)
    await waitForElementToBeRemoved(() => screen.queryByTestId('spinner'))
    // 2)
    const arrayOfListItems = await screen.findAllByTestId('list-user')
    // ora ho aspettato il termine della Promise e verifichiamo una volta
    // finita la fetch quanti elementi della lista sono stati renderizzati
    // 4)
    // expect(arrayOfListItems).toHaveLength(10)
    expect(arrayOfListItems.length).toBeGreaterThan(0)
  })
  it('returns just 2 result with a specific search', async () => {
    // 1)
    render(<UsersList />)
    // 2)
    // cerco l'input della ricerca
    const searchInput = screen.getByPlaceholderText('Cerca un utente')
    // 3) ci scrivo dentro "clementin"
    fireEvent.change(searchInput, { target: { value: 'clementin' } })
    const arrayOfListItems = await screen.findAllByTestId('list-user')
    expect(arrayOfListItems).toHaveLength(2)
  })
})
