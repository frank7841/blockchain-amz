import Sidebar from "./components/Sidebar"
import Main from "./components/Main"

const styles={
  container:`h-full w-full flex bg-[#ffff]`
}

export default function Home() {
  return (
    <div className={styles.container}>
      <Sidebar/>
      <Main/>
    </div>
  )
}
