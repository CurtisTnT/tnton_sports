import { PropsWithChildren, useState } from "react";
import { AppState, StoreContext, initialAppState } from "./Store";

export default function StoreProvider(props: PropsWithChildren) {
  const [appState, setAppState] = useState<AppState>(initialAppState);

  return (
    <StoreContext.Provider value={[appState, setAppState]}>
      {props.children}
    </StoreContext.Provider>
  );
}
