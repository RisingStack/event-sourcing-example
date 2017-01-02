# event-sourcing-example

Event Sourcing Example repo for the Node.js at Scale blog series

## Usage

```
npm start
```

Console output:

```
--- Create events ---
Accounts are opened { Samantha: 1000, John: 500, Suzzy: 0 }
Some money are transfered { Samantha: 0, John: 1000, Suzzy: 500 }
Samantha closed her account { John: 1000, Suzzy: 500 }
--- Process events ---
Rebuild accounts from event log { John: 1000, Suzzy: 500 }
Undo last event { John: 1000, Suzzy: 500, Samantha: 0 }
Undo last two event { John: 1000, Suzzy: 0, Samantha: 500 }
Query first step { Samantha: 1000 }
Query second step { Samantha: 1000, John: 500 }
```

Event log output (event_log.txt):

```
{"type":"open","id":"Samantha","balance":1000,"timestamp":1483365228080}
{"type":"open","id":"John","balance":500,"timestamp":1483365228080}
{"type":"open","id":"Suzzy","balance":0,"timestamp":1483365228081}
{"type":"transfer","fromId":"Samantha","toId":"John","amount":500,"timestamp":1483365228085}
{"type":"transfer","fromId":"Samantha","toId":"Suzzy","amount":500,"timestamp":1483365228086}
{"type":"close","id":"Samantha","balance":0,"timestamp":1483365228086}
```
