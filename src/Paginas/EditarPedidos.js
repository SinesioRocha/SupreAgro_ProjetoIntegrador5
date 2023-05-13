import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { Link, useNavigate } from "react-router-dom";
import { Toast } from 'primereact/toast';
import { Card } from 'primereact/card';



export function EditarPedidos() {
    const [colaborador, setColaborador] = useState([]);
    const [clientes, setclientes] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedOption2, setSelectedOption2] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [isLoading, setIsLoading] = useState(true);
    const [produtos, setProdutos] = useState([]);
    const [valorTotal, setValorTotal] = useState("");
    const { id } = useParams();
    const toast = useRef(null);



    useEffect(() => {
      buscarDetalhes();
      obterDados();
    }, []);

    const buscarDetalhes = () => {
      const api = axios.create({
        baseURL: "http://localhost:3000"
      });
  
      api.get(`http://localhost:3001/pedidos/${id}`)
        .then((response) => {
          setSelectedDate(new Date(response.data.dataVenda));
          console.log(response.data);
          if (colaborador.length > 0) {
            const index = colaborador.findIndex((item) => item.value === response.data.idColaborador.value);
            setSelectedOption(colaborador[index]);
          }
          if (clientes.length > 0) {
            const index2 = clientes.findIndex((item) => item.value === response.data.idCliente.value);
            setSelectedOption2(clientes[index2]);
          }
          setProdutos(response.data.produtos);
          setValorTotal(response.data.valorTotal);
        })
        .catch((err) => {
          console.error("erro ao listar");
        });
    };
  
    function obterDados() {
      const api = axios.create({
        baseURL: "http://localhost:3001"
      });
  
      api.get("/colaboradores")
        .then((response) => {
          console.log(response.data);
          setColaborador(response.data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error("Erro ao Listar");
        });
  
      api.get("/clientes")
        .then((response) => {
          console.log(response.data);
          setclientes(response.data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error("Erro ao Listar");
        });
    }



    async function editar() {
        console.log('clicou no editar');
        const data = {
          idCliente: selectedOption2,
          idColaborador: selectedOption,
          dataVenda: selectedDate,
          produtos,
          valorTotal
        };
      
        try {
          const response = await axios.put(`http://localhost:3001/pedidos/${id}`, data);
          if (response.status === 200) {
            toast.current.show({
              severity: "success",
              summary: "Sucesso",
              detail: "Pedido atualizado com sucesso!",
              life: 3000
            });
          } else {
            toast.current.show({
              severity: "error",
              summary: "Erro",
              detail: "Erro ao atualizar o pedido",
              life: 3000
            });
          }
        } catch (err) {
          console.error("Erro ao atualizar pedido:", err);
          toast.current.show({
            severity: "error",
            summary: "Erro",
            detail: "Erro ao atualizar o pedido: " + err.message,
            life: 3000
          });
        }
      }
      
  
  
  
    return (
        <div className="card flex justify-content-center mt-4">
            <Card title="">
                <h4 className="m-0">Editando pedido Nº {id}</h4>
            </Card>
            <Toast ref={toast}></Toast>
          <div className="p-col-4 p-md-4">
            <p>Colaborador:</p>
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-user"></i>
              </span>
              <Dropdown
                        value={selectedOption}
                        onChange={(e) => setSelectedOption(e.value)} // atualiza para e.value
                        options={colaborador}
                        optionLabel="nome"
                        placeholder="Selecione o Colaborador"
                        className="w-full md:w-14rem"
                        required
                        />

            </div>
          </div>
          <div className="p-col-4 p-md-4">
            <p>Cliente:</p>
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-users"></i>
              </span>
              <Dropdown
                value={selectedOption2}
                onChange={(e) => setSelectedOption2(e.value)} // atualiza para e.value
                options={clientes}
                optionLabel="nome"
                placeholder="Selecione o Cliente"
                className="w-full md:w-14rem"
                required
                />
            </div>
          </div>
            <div className="p-col-4 p-md-4 calendar-wrapper">
                <p>Data da Venda:</p>
                <div className="p-inputgroup">
                    <span className="p-inputgroup-addon">
                        <i className="pi pi-calendar-plus"></i>
                    </span>
                    <Calendar dateFormat="dd/mm/yy" id="basic" value={selectedDate} onChange={(e) => setSelectedDate(e.value)} name="dataVenda" required/>
                </div>  
            </div>
    
            <div className=" flex flex-wrap justify-content-center gap-3 ml-auto">
                <Button label="Salvar" raised  onClick={editar}/>
                <Link to="/Paginas/Pedidos"> 
                    <Button label="Cancelar"  raised className="buton-cancel"/>
                </Link>
            </div>
            <p>**Obs: Os Produtos do pedido nãõ podem ser Editando! Para alterar algum produto Tem que excluir o pedido e fazer Outro
            </p>
        </div>  
        
    )
}