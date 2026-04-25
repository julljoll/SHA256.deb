#!/usr/bin/env python3
"""
Sistema de Gestión Forense para Dispositivos Android
Punto de entrada principal de la aplicación
"""

import sys
import os

# Añadir el directorio actual al path para imports relativos
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from PyQt6.QtWidgets import QApplication
from PyQt6.QtCore import Qt, QTranslator, QLocale
from PyQt6.QtGui import QFont

from ui.main_window import MainWindow
from services.audit_service import AuditService


def load_stylesheet(app: QApplication) -> None:
    """Carga la hoja de estilos desde assets/style.qss"""
    style_path = os.path.join(os.path.dirname(__file__), 'assets', 'style.qss')
    if os.path.exists(style_path):
        with open(style_path, 'r', encoding='utf-8') as f:
            app.setStyleSheet(f.read())
    else:
        print(f"Advertencia: No se encontró el archivo de estilos en {style_path}")


def main():
    """Función principal de entrada"""
    # Inicializar servicio de auditoría
    audit_service = AuditService()
    audit_service.log_event("SYSTEM", "Inicio de la aplicación")
    
    # Crear aplicación Qt
    app = QApplication(sys.argv)
    app.setApplicationName("Sistema Forense Android")
    app.setApplicationVersion("1.0.0")
    app.setOrganizationName("Laboratorio Forense")
    
    # Configurar fuente global
    font = QFont("Ubuntu", 10)
    app.setFont(font)
    
    # Cargar hoja de estilos
    load_stylesheet(app)
    
    # Crear y mostrar ventana principal
    window = MainWindow()
    window.show()
    
    # Ejecutar loop de eventos
    sys.exit(app.exec())


if __name__ == "__main__":
    main()
