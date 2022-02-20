
export default function CurrentListeners({currentListeners}) {
  return (
      <div className="text-center" style={{marginBottom: 20, marginTop: 10}}>
        Current Listeners: <span id="listeners">{currentListeners}</span>
      </div>
  );
}