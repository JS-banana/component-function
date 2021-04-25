/**
 * bytemd
 * 同掘金markdown编辑器
 */
import { useState } from "react"
import { Editor } from "@bytemd/react"
import gfm from "@bytemd/plugin-gfm"
import gemoji from "@bytemd/plugin-gemoji"
import highlight from "@bytemd/plugin-highlight-ssr"
import mediumZoom from "@bytemd/plugin-medium-zoom"

import zhHans from "bytemd/lib/locales/zh_Hans.json"

import "bytemd/dist/index.min.css"
import "../index.css"

import "highlight.js/styles/vs.css"

const plugins = [gfm(), gemoji(), highlight(), mediumZoom()]

const App = () => {
  const [value, setValue] = useState<string>("")

  return (
    <div>
      <header style={{ height: 60 }}>
        <b>标题</b>
      </header>
      <Editor
        locale={zhHans}
        value={value}
        plugins={plugins}
        onChange={(v: string) => {
          setValue(v)
        }}
        uploadImages={async (files) => {
          console.log("files", files)
          return [
            {
              url: "",
              alt: "", // optional
              title: "", // optional
            },
          ]
        }}
      />
    </div>
  )
}
export default App
