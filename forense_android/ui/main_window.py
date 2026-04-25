#!/usr/bin/env python3
"""
Ventana principal de la aplicación
"""

from PyQt6.QtWidgets import QMainWindow, QWidget, QVBoxLayout, QHBoxLayout, QStackedWidget, QPushButton, QLabel, QFrame
from PyQt6.QtCore import Qt, QSize
from PyQt6.QtGui import QIcon, QFont


class MainWindow(QMainWindow):
    """Ventana principal con navegación por pestañas/fases"""
    
    def __init__(self):
        super().__init__()
        self.setWindowTitle("Sistema Forense Android v1.0.0")
        self.setMinimumSize(1200, 800)
        
        # Widget central
        central_widget = QWidget()
        self.setCentralWidget(central_widget)
        layout_principal = QVBoxLayout(central_widget)
        layout_principal.setContentsMargins(0, 0, 0, 0)
        layout_principal.setSpacing(0)
        
        # Barra lateral de navegación
        self.sidebar = self._crear_sidebar()
        
        # Área de contenido con stack de páginas
        self.stack_paginas = QStackedWidget()
        self.stack_paginas.setStyleSheet("background-color: #1e1e1e;")
        
        # Placeholder temporal (páginas se implementarán en siguiente iteración)
        placeholder = self._crear_placeholder("Sistema Forense Android", 
                                              "Seleccione una fase del procedimiento forense")
        self.stack_paginas.addWidget(placeholder)
        
        # Layout horizontal
        layout_horizontal = QHBoxLayout()
        layout_horizontal.addWidget(self.sidebar)
        layout_horizontal.addWidget(self.stack_paginas)
        layout_horizontal.setContentsMargins(0, 0, 0, 0)
        layout_horizontal.setSpacing(0)
        
        layout_principal.addLayout(layout_horizontal)
        
        # Inicializar estado
        self._actualizar_botones_sidebar(0)
    
    def _crear_sidebar(self) -> QFrame:
        """Crea la barra lateral de navegación"""
        sidebar = QFrame()
        sidebar.setFixedWidth(250)
        sidebar.setStyleSheet("""
            QFrame {
                background-color: #2d2d2d;
                border-right: 2px solid #3d3d3d;
            }
        """)
        
        layout = QVBoxLayout(sidebar)
        layout.setContentsMargins(10, 20, 10, 20)
        layout.setSpacing(15)
        
        # Logo/Título
        logo_label = QLabel("🔍 FORENSE\nANDROID")
        logo_label.setAlignment(Qt.AlignmentFlag.AlignCenter)
        logo_label.setFont(QFont("Ubuntu", 16, QFont.Weight.Bold))
        logo_label.setStyleSheet("color: #4a9eff; padding: 20px;")
        layout.addWidget(logo_label)
        
        layout.addSpacing(20)
        
        # Botones de navegación por fases
        self.botones_fase = []
        fases = [
            ("FASE I", "Adquisición"),
            ("FASE II", "Procesamiento"),
            ("FASE III", "Informe Pericial")
        ]
        
        for i, (titulo, descripcion) in enumerate(fases):
            btn = QPushButton(f"{titulo}\n{descripcion}")
            btn.setCheckable(True)
            btn.setFixedHeight(80)
            btn.setStyleSheet(self._estilo_boton_sidebar(i == 0))
            btn.clicked.connect(lambda checked, idx=i: self._cambiar_fase(idx))
            layout.addWidget(btn)
            self.botones_fase.append(btn)
        
        layout.addStretch()
        
        # Información de versión
        version_label = QLabel("Versión 1.0.0\nBuild 2025.04")
        version_label.setAlignment(Qt.AlignmentFlag.AlignCenter)
        version_label.setStyleSheet("color: #888; font-size: 10px;")
        layout.addWidget(version_label)
        
        return sidebar
    
    def _estilo_boton_sidebar(self, activo: bool) -> str:
        """Retorna el estilo CSS para botones del sidebar"""
        if activo:
            return """
                QPushButton {
                    background-color: #4a9eff;
                    color: white;
                    border-radius: 8px;
                    text-align: left;
                    padding: 10px;
                    font-weight: bold;
                }
                QPushButton:hover {
                    background-color: #3a8eef;
                }
            """
        else:
            return """
                QPushButton {
                    background-color: #3d3d3d;
                    color: #ccc;
                    border-radius: 8px;
                    text-align: left;
                    padding: 10px;
                }
                QPushButton:hover {
                    background-color: #4d4d4d;
                }
            """
    
    def _crear_placeholder(self, titulo: str, mensaje: str) -> QWidget:
        """Crea un widget placeholder temporal"""
        widget = QWidget()
        layout = QVBoxLayout(widget)
        layout.setAlignment(Qt.AlignmentFlag.AlignCenter)
        
        label_titulo = QLabel(titulo)
        label_titulo.setFont(QFont("Ubuntu", 24, QFont.Weight.Bold))
        label_titulo.setStyleSheet("color: #4a9eff;")
        label_titulo.setAlignment(Qt.AlignmentFlag.AlignCenter)
        layout.addWidget(label_titulo)
        
        label_mensaje = QLabel(mensaje)
        label_mensaje.setFont(QFont("Ubuntu", 14))
        label_mensaje.setStyleSheet("color: #888;")
        label_mensaje.setAlignment(Qt.AlignmentFlag.AlignCenter)
        layout.addWidget(label_mensaje)
        
        return widget
    
    def _cambiar_fase(self, indice: int):
        """Cambia a la fase seleccionada"""
        self.stack_paginas.setCurrentIndex(indice)
        self._actualizar_botones_sidebar(indice)
    
    def _actualizar_botones_sidebar(self, indice_activo: int):
        """Actualiza el estilo de los botones del sidebar"""
        for i, btn in enumerate(self.botones_fase):
            btn.setStyleSheet(self._estilo_boton_sidebar(i == indice_activo))
