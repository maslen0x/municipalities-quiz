import { useSelector } from 'react-redux'

const Loading = ({ state, children }) => {
  const isLoading = useSelector(({ isLoading }) => isLoading)

  return (
    !isLoading ? (
      state.length ? (
        children
      ) : 'Список пуст'
    ) : 'Загрузка...'
  )
}

export default Loading