import React, { useState, useEffect, useRef } from "react"
import { Button, ButtonProps } from "antd"

type FilterOnclickProps = Omit<ButtonProps, "onClick">

interface CaptchaProps extends FilterOnclickProps {
  /** @name 接收异步请求，需要根据接口结果，返回boolen类型供组件内部使用 */
  onGetCaptcha: () => Promise<boolean>
  /** @name 倒计时的秒数 */
  countNum?: number
}

const Captcha: React.FC<CaptchaProps> = ({ onGetCaptcha, children, countNum, ...rest }) => {
  const timerRef = useRef<{ timer: any }>({ timer: null })
  const [loading, setLoading] = useState(false)
  const [timing, setTiming] = useState(false)
  const [showTime, setShowTime] = useState(false)
  const [count, setCount] = useState(countNum || 60)

  const handleClick = async () => {
    setTiming(true)
    setLoading(true)
    const res = await onGetCaptcha()
    setLoading(false)
    if (res) {
      console.log("异步请求：success ")
      setShowTime(true)
    } else {
      console.log("异步请求：failure ")
      // 异步请求返回 false 重置取消
      setTiming(false)
      clearInterval(timerRef.current.timer)
    }
  }

  useEffect(() => {
    if (timing) {
      timerRef.current.timer = setInterval(() => {
        setCount((prev) => {
          if (prev <= 1) {
            console.log("计时完成：重置 ")
            setTiming(false)
            clearInterval(timerRef.current.timer)
            return countNum || 60
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => clearInterval(timerRef.current.timer)
  }, [timing])

  return (
    <Button loading={loading} disabled={timing} onClick={handleClick} {...rest}>
      {showTime && timing ? `${count} 秒后重新获取` : children || "获取验证码"}
    </Button>
  )
}

export default Captcha
