import { FunctionComponent, useEffect, useState } from 'react'
import { useVisible } from 'react-hooks-visible'
import { HashLoader } from 'react-spinners'

type Props = {
  canLoadMore: boolean
  onLoadMore: () => Promise<any>
}

const LoadMore: FunctionComponent<Props> = ({ canLoadMore, onLoadMore }) => {
  const [wrapperRef, isVisible] = useVisible<HTMLDivElement>()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isVisible && canLoadMore && !loading) {
      setLoading(true)
      onLoadMore().then(() => setLoading(false))
    }
  }, [isVisible])

  if (!canLoadMore) {
    return null
  }

  return (
    <div
      ref={wrapperRef}
      className="flex items-center justify-center w-full my-8"
    >
      <HashLoader color="#14b8a6" />
    </div>
  )
}

export default LoadMore
