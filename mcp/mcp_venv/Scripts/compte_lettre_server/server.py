from mcp.server.fastmcp import FastMCP 
import time 
import signal
import sys

def signal_handler(signal_received, frame):
    print("Arrêt du serveur compte_lettre")
    sys.exit(0)

signal.signal(signal.SIGINT, signal_handler)

mcp = FastMCP(
    name="compte-lettre",
    host="127.0.0.1",
    port=5000,
    timeout=30
)

@mcp.tool()
def compte_lettre(mot: str) -> int:
    """
    Permet de compter le nombre d'occurrences de la lettre 'n' dans un mot.
    """
    try:
        if not isinstance(mot, str):
            raise ValueError("Le mot doit être une chaîne de caractères.")
        return mot.count("n")
    except Exception as e:
        print(f"Erreur : {e}", file=sys.stderr)
        return 0
    
if __name__ == "__main__":
    try:
        print("Démarrage du serveur compte-lettre sur http://127.0.0.1:5000")
        mcp.run()
    except Exception as e:
        print(f"Erreur au démarrage : {e}", file=sys.stderr)
        time.sleep(2)
        sys.exit(0)
    except KeyboardInterrupt:
        print("Arrêt du serveur compte-lettre...")
        sys.exit(0)