TEMPLATE = app
CONFIG += console
CONFIG -= app_bundle
CONFIG -= qt

INCLUDEPATH = /usr/include/jsoncpp/
unix:LIBS += -ljsoncpp

SOURCES += \
    ../sunblindtest.cc \
    ../../classes/sunblind/cornice.cc \
    ../../classes/sunblind/lamella.cc \
    ../../classes/sunblind/layer.cc \
    ../../classes/sunblind/multifactory.cc \
    ../../classes/sunblind/multilayer.cc \
    ../../classes/sunblind/multisunblind.cc \
    ../../classes/sunblind/sunblind.cc \
    ../../classes/sunblind/verticallayer.cc \
    ../../classes/sunblind/verticalsunblind.cc

