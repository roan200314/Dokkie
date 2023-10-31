# documentatie uitjebewerk

<code>
const event: any[] = (await runQuery("SELECT * FROM event WHERE eventId = (?)", [id])) as any;

const uitjeDB: any = event[0];
</code>

Met bovenstaande code haal je alles op uit de database uit de tabel event, en met 'uitjeDB' wordt de eerste regel opgehaald waar de <code> [id] </code> bij hoort.