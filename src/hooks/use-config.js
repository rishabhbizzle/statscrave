import { useAtom } from "jotai"
import { atomWithStorage } from "jotai/utils"


const configAtom = atomWithStorage("config", {
  style: "default",
  theme: "slate",
  radius: 0.5,
})

export function useConfig() {
  return useAtom(configAtom)
}