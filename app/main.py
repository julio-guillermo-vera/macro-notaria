"""Protocolo Cloud Desktop V2 - base.
Abre la interfaz HTML local y deja preparado el proyecto para conectar Word.
"""
import os
import webbrowser

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
HTML = os.path.join(BASE_DIR, "index.html")

if __name__ == "__main__":
    webbrowser.open(f"file:///{HTML.replace(os.sep, '/')}")
