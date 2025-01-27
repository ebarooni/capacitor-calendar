import { CapacitorCalendar } from '@ebarooni/capacitor-calendar';

window.testEcho = () => {
    const inputValue = document.getElementById("echoInput").value;
    CapacitorCalendar.echo({ value: inputValue })
}
