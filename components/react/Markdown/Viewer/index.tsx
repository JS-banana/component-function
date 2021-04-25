/**
 * bytemd
 * 同掘金markdown编辑器
 */
import { useState, useEffect } from "react"
import { Viewer } from "@bytemd/react"
import gfm from "@bytemd/plugin-gfm"
import gemoji from "@bytemd/plugin-gemoji"
import highlight from "@bytemd/plugin-highlight-ssr"
import mediumZoom from "@bytemd/plugin-medium-zoom"

import "bytemd/dist/index.min.css"
import "../index.css"

import "highlight.js/styles/vs.css"

import { mark_content } from "../mock"

const plugins = [gfm(), gemoji(), highlight(), mediumZoom()]

const App = () => {
  const [value, setValue] = useState<string>("")

  useEffect(() => {
    setValue(mark_content.replace(/↵/g, "\n"))
  }, [])

  return (
    <div className="markdown-view-container">
      <header style={{ height: 60 }}>
        <b>标题</b>
      </header>
      <Viewer value={value} plugins={plugins} />
    </div>
  )
}
export default App
