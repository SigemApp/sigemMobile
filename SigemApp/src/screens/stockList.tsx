import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, ScrollView, Modal } from 'react-native';

interface StockItem {
  id: string;
  name: string;
  code: string;
  quantity: number;
  unitPrice: number;
  type: 'piece' | 'material';
}

const initialStockItems: StockItem[] = [
  { id: '1', name: 'Produto A', code: 'A001', quantity: 10, unitPrice: 15.0, type: 'piece' },
  { id: '2', name: 'Produto B', code: 'A002', quantity: 8, unitPrice: 20.0, type: 'piece' },
  { id: '3', name: 'Produto C', code: 'A003', quantity: 5, unitPrice: 12.0, type: 'piece' },
  { id: '4', name: 'Material A', code: 'B001', quantity: 3, unitPrice: 5.0, type: 'material' },
  { id: '5', name: 'Material B', code: 'B002', quantity: 7, unitPrice: 8.0, type: 'material' },
  { id: '6', name: 'Material C', code: 'B003', quantity: 12, unitPrice: 6.0, type: 'material' },
];

const StockManagement = () => {
  const [search, setSearch] = useState<string>('');
  const [filteredItems, setFilteredItems] = useState<StockItem[]>(initialStockItems);
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [isAddModalVisible, setAddModalVisible] = useState<boolean>(false);
  const [isUpdateModalVisible, setUpdateModalVisible] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<StockItem | null>(null);
  const [newItem, setNewItem] = useState<StockItem>({
    id: '',
    name: '',
    code: '',
    quantity: 0,
    unitPrice: 0,
    type: 'piece',
  });
  const [selectedType, setSelectedType] = useState<'piece' | 'material'>('piece');

  const handleSearchChange = (text: string) => {
    setSearch(text);
    const filtered = text
      ? initialStockItems.filter(item =>
        item.type === selectedType && item.name.toLowerCase().includes(text.toLowerCase()))
      : initialStockItems.filter(item => item.type === selectedType);
    setFilteredItems(filtered);
  };

  const handleLongPress = (item: StockItem) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const handleAddItem = () => {
    const newId = (filteredItems.length + 1).toString();
    const itemToAdd: StockItem = { ...newItem, id: newId };
    const updatedItems = [...filteredItems, itemToAdd];
    setFilteredItems(updatedItems);
    setAddModalVisible(false);
    setNewItem({ id: '', name: '', code: '', quantity: 0, unitPrice: 0, type: selectedType });
    handleSearchChange(search);
  };

  const handleUpdateItem = () => {
    if (selectedItem) {
      const updatedList = filteredItems.map(item => {
        if (item.id === selectedItem.id) {
          return {
            ...item,
            name: selectedItem.name,
            code: selectedItem.code,
            quantity: selectedItem.quantity,
            unitPrice: selectedItem.unitPrice,
            type: item.type,
          };
        }
        return item;
      });
      setFilteredItems(updatedList);
      setUpdateModalVisible(false);
      setSelectedItem(null);
    }
  };

  const getStatusColor = (quantity: number): string => {
    if (quantity < 5) return 'red';
    if (quantity < 10) return '#FFD700';
    return 'green';
  };

  const renderItem = ({ item }: { item: StockItem }) => (
    <TouchableOpacity onLongPress={() => handleLongPress(item)} style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#ccc', paddingVertical: 10 }}>
      <Text style={{ flex: 2, padding: 4, textAlign: 'center' }}>{item.name}</Text>
      <Text style={{ flex: 1, padding: 4, textAlign: 'center' }}>{item.code}</Text>
      <Text style={{ flex: 1, padding: 4, textAlign: 'center' }}>{item.quantity}</Text>
      <Text style={{ flex: 1, padding: 4, textAlign: 'center', color: getStatusColor(item.quantity) }}>
        {item.quantity < 5 ? 'Crítico' : item.quantity < 10 ? 'Alerta' : 'Normal'}
      </Text>
      <Text style={{ flex: 1.5, padding: 4, textAlign: 'center' }}>R$ {item.unitPrice.toFixed(2)}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: '#f5f5f5' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Gerenciamento de Estoque</Text>
      <TextInput
        value={search}
        onChangeText={handleSearchChange}
        placeholder="Buscar item..."
        style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, marginBottom: 20 }}
      />

      <View style={{ flexDirection: 'row', marginBottom: 20 }}>
        <TouchableOpacity onPress={() => setSelectedType('piece')} style={{ flex: 1, backgroundColor: selectedType === 'piece' ? '#070419' : '#ccc', padding: 10, borderRadius: 5, alignItems: 'center' }}>
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>Peças</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedType('material')} style={{ flex: 1, backgroundColor: selectedType === 'material' ? '#070419' : '#ccc', padding: 10, borderRadius: 5, alignItems: 'center' }}>
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>Materiais</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => setAddModalVisible(true)} style={{ backgroundColor: '#070419', padding: 10, borderRadius: 5, marginBottom: 20 }}>
        <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>Cadastrar Item</Text>
      </TouchableOpacity>

      <View style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 5 }}>
        <View style={{ flexDirection: 'row', backgroundColor: '#f0f0f0' }}>
          <Text style={{ flex: 1, padding: 10, fontWeight: 'bold', textAlign: 'center' }}>Nome</Text>
          <Text style={{ flex: 1, padding: 10, fontWeight: 'bold', textAlign: 'center' }}>Código</Text>
          <Text style={{ flex: 1, padding: 10, fontWeight: 'bold', textAlign: 'center' }}>Qtd</Text>
          <Text style={{ flex: 1, padding: 10, fontWeight: 'bold', textAlign: 'center' }}>Status</Text>
          <Text style={{ flex: 1.5, padding: 10, fontWeight: 'bold', textAlign: 'center' }}>Valor</Text>
        </View>

        <FlatList
          data={filteredItems.filter(item => item.type === selectedType)}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          ListEmptyComponent={<Text style={{ textAlign: 'center', marginVertical: 20 }}>Nenhum item encontrado.</Text>}
        />
      </View>

      {/* Modal de cadastro de novo item */}
      <Modal visible={isAddModalVisible} transparent={true} animationType="slide">
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)', padding: 20 }}>
          <ScrollView style={{ backgroundColor: '#fff', borderRadius: 8, padding: 20, maxHeight: '75%', width: '90%' }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' }}>Cadastrar Item</Text>
            <Text>Nome do Item</Text>
            <TextInput
              placeholder="Nome"
              value={newItem.name}
              onChangeText={text => setNewItem({ ...newItem, name: text })}
              style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, marginBottom: 20 }}
            />
            <Text>Código</Text>
            <TextInput
              placeholder="Código"
              value={newItem.code}
              onChangeText={text => setNewItem({ ...newItem, code: text })}
              style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, marginBottom: 20 }}
            />
            <Text>Quantidade de Entrada</Text>
            <TextInput
              placeholder="Qtd"
              value={newItem.quantity.toString()}
              onChangeText={text => setNewItem({ ...newItem, quantity: parseInt(text, 10) })}
              keyboardType="numeric"
              style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, marginBottom: 20 }}
            />
            <Text>Valor Unitário</Text>
            <TextInput
              placeholder="Valor Unitário"
              value={newItem.unitPrice.toString()}
              onChangeText={text => setNewItem({ ...newItem, unitPrice: parseFloat(text) })}
              keyboardType="numeric"
              style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, marginBottom: 20 }}
            />
            <View style={{ flexDirection: 'row', marginBottom: 20 }}>
              <TouchableOpacity onPress={() => setNewItem({ ...newItem, type: 'piece' })} style={{ flex: 1, backgroundColor: newItem.type === 'piece' ? '#070419' : '#ccc', padding: 10, borderRadius: 5, alignItems: 'center' }}>
                <Text style={{ color: '#fff', fontWeight: 'bold' }}>Peça</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setNewItem({ ...newItem, type: 'material' })} style={{ flex: 1, backgroundColor: newItem.type === 'material' ? '#070419' : '#ccc', padding: 10, borderRadius: 5, alignItems: 'center' }}>
                <Text style={{ color: '#fff', fontWeight: 'bold' }}>Material</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={handleAddItem} style={{ backgroundColor: '#070419', padding: 10, borderRadius: 5 }}>
              <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>Adicionar Item</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setAddModalVisible(false)} style={{ backgroundColor: '#ccc', padding: 10, borderRadius: 5, marginTop: 10 }}>
              <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>Cancelar</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>

      {/* Modal de detalhes do item */}
      <Modal visible={isModalVisible} transparent={true} animationType="slide">
        <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)', padding: 20 }}>
          <View style={{ backgroundColor: '#fff', borderRadius: 8, padding: 20 }}>
            {selectedItem && (
              <>
                <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>{selectedItem.name}</Text>
                <Text>Código: {selectedItem.code}</Text>
                <Text>Qtd: {selectedItem.quantity}</Text>
                <Text>Valor Unitário: R$ {selectedItem.unitPrice.toFixed(2)}</Text>
                <TouchableOpacity onPress={() => { setUpdateModalVisible(true); setModalVisible(false); }} style={{ backgroundColor: '#070419', padding: 10, borderRadius: 5 }}>
                  <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setModalVisible(false)} style={{ backgroundColor: '#ccc', padding: 10, borderRadius: 5, marginTop: 10 }}>
                  <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>Fechar</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* Modal de edição do item */}
      <Modal visible={isUpdateModalVisible} transparent={true} animationType="slide">
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)', padding: 20 }}>
          <ScrollView style={{ backgroundColor: '#fff', borderRadius: 8, padding: 20, maxHeight: '70%', width: '90%' }}>
            {selectedItem && (
              <>
                <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' }}>Editar Item</Text>
                <Text>Nome do Item</Text>
                <TextInput
                  placeholder="Nome"
                  value={selectedItem.name}
                  onChangeText={text => setSelectedItem(prev => prev ? { ...prev, name: text } : prev)}
                  style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, marginBottom: 20 }}
                />
                <Text>Código</Text>
                <TextInput
                  placeholder="Código"
                  value={selectedItem.code}
                  onChangeText={text => setSelectedItem(prev => prev ? { ...prev, code: text } : prev)}
                  style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, marginBottom: 20 }}
                />
                <Text>Quantidade de Entrada</Text>
                <TextInput
                  placeholder="Qtd"
                  value={selectedItem.quantity.toString()}
                  onChangeText={text => setSelectedItem(prev => prev ? { ...prev, quantity: parseInt(text, 10) } : prev)}
                  keyboardType="numeric"
                  style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, marginBottom: 20 }}
                />
                <Text>Valor Unitário</Text>
                <TextInput
                  placeholder="Valor Unitário"
                  value={selectedItem.unitPrice.toString()}
                  onChangeText={text => setSelectedItem(prev => prev ? { ...prev, unitPrice: parseFloat(text) } : prev)}
                  keyboardType="numeric"
                  style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, marginBottom: 20 }}
                />
                <TouchableOpacity onPress={handleUpdateItem} style={{ backgroundColor: '#070419', padding: 10, borderRadius: 5 }}>
                  <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>Salvar Alterações</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setUpdateModalVisible(false)} style={{ backgroundColor: '#ccc', padding: 10, borderRadius: 5, marginTop: 10 }}>
                  <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>Cancelar</Text>
                </TouchableOpacity>
              </>
            )}
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

export default StockManagement;
