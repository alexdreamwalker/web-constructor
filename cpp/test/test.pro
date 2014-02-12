TEMPLATE = app
CONFIG += console
CONFIG -= app_bundle
CONFIG -= qt
CONFIG += c++11

SOURCES += main.cpp

HEADERS += \
    ../construction.hpp \
    ../complectation.hpp \
    ../sunblind/verticalsunblind.hpp \
    ../sunblind/verticallayer.hpp \
    ../sunblind/sunblind.hpp \
    ../sunblind/layer.hpp \
    ../sunblind/lamella.hpp \
    ../sunblind/cornice.hpp
