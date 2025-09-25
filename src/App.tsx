import { MiniKit, Permission } from "@worldcoin/minikit-js"
import { useEffect, useState } from "react"

export const App = () => {
  const [requestedPermissionsPayload, setRequestedPermissionsPayload] = useState('')
  const [permissions, setPermissions] = useState('')
  const [isInstalled, setIsInstalled] = useState(false)

  const handleClick = async () => {
    if (!MiniKit.isInstalled()) return
    setIsInstalled(true)
    
    setRequestedPermissionsPayload(`Waiting for response since ${new Date().toLocaleTimeString()}`)
    try {
      const {finalPayload} = await MiniKit.commandsAsync.requestPermission({ permission: Permission.Notifications })

      setRequestedPermissionsPayload(JSON.stringify(finalPayload, null, 2))
    } catch  {
      setRequestedPermissionsPayload('Some error')
    }
  }

  useEffect(() => {
    if (!MiniKit.isInstalled()) return
    setIsInstalled(true)
    
    async function main() {
      setPermissions(`Waiting for response since ${new Date().toLocaleTimeString()}`)
      try {
        const {finalPayload} = await MiniKit.commandsAsync.getPermissions()
        setPermissions(JSON.stringify(finalPayload, null, 2))
      } catch {
        setPermissions('Some error')
      }
    }

    main()
  }, [])


  return (
    <div className="p-6 grid gap-y-4">
      <div> Version 4 </div>
      <div>Is installed: {JSON.stringify(isInstalled)}</div>
      <label>Permissions</label>
      <textarea rows={20} className="text-xs p-1 border border-black rounded-lg" readOnly>{permissions}</textarea>
      <button
        onClick={handleClick}
        className="bg-gray-900 text-white font-bold rounded-lg px-3 py-2 text-lg"
      >
        Request notifications
      </button>
      <label>Requested permissions</label>
      <textarea rows={20} className="text-xs p-1 border border-black rounded-lg" readOnly>{requestedPermissionsPayload}</textarea>
    </div>
  )
}
