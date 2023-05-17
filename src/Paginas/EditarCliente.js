import React, { useState, useEffect, useRef } from "react";
import 'primeicons/primeicons.css';
import { InputText } from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { useHistory } from 'react-router-dom';


export function EditarCliente(){
    const[nome, setNome] = useState();
    const[telefone, setTelefone] = useState();
    const[cnpj, setCNPJ] = useState();
    const[logradouro, setLogradouro] = useState();
    const[numero, setNumero] = useState();
    const[bairro, setBairro] = useState();
    const[cidade, setCidade] = useState();
    const[uf, setUf] = useState();
    const[cliente, setCliente] = useState([]);

    const options = [
        {
          label: 'Acre',
          value: 'AC',
        },
        {
          label: 'Alagoas',
          value: 'AL',
        },
        {
            label: 'Amapá',
            value: 'AP',  
        },
        {
            label: 'Amazonas',
            value: 'AM',  
        },
        {
            label: 'Bahia',
            value: 'BA',  
        },
        {
            label: 'Ceará',
            value: 'CE',  
        },
        {
            label: 'Espírito Santo',
            value: 'ES',  
        },
        {
            label: 'Goiás',
            value: 'GO',  
        },
        {
            label: 'Maranhão',
            value: 'MA ',  
        },
        {
            label: 'Mato Grosso',
            value: 'MT',  
        },
        {
            label: 'Mato Grosso do Sul',
            value: 'MS',  
        },
        {
            label: 'Minas Gerais',
            value: 'MG',  
        },
        {
            label: 'Pará',
            value: 'PA',  
        },
        {
            label: 'Paraíba',
            value: 'PB',  
        },
        {
            label: 'Paraná',
            value: 'PR',  
        },
        {
            label: 'Pernambuco',
            value: 'PE',  
        },
        {
            label: 'Piauí',
            value: 'PI',  
        },
        {
            label: 'Rio de Janeiro',
            value: 'RJ',  
        },
        {
            label: 'Rio Grande do Norte',
            value: 'RN',  
        },
        {
            label: 'Rio Grande do Sul',
            value: 'RS',  
        },
        {
            label: 'Rondônia',
            value: 'RO',  
        },
        {
            label: 'Roraima',
            value: 'RR',  
        },
        {
            label: 'Santa Catarina',
            value: 'SC',  
        },
        {
            label: 'São Paulo',
            value: 'SP',  
        },
         {
            label: 'Sergipe',
            value: 'SR',  
        },
        {
            label: 'Tocantins',
            value: 'TO',  
        },
        {
            label: 'Distrito Federal',
            value: 'DF',  
        }
    ];

    const toast = useRef(null);

    const {id} = useParams();

  
    useEffect(() => {
       buscarDetalhes();
       
    }, []);

    const buscarDetalhes = () => {

        const api = axios.create({
          baseURL: "http://localhost:3000"
      });
    
      api.get("http://localhost:3001/clientes/" + id)
      .then((response) =>  {
                         setNome(response.data.nome);
                         setTelefone(response.data.telefone);
                         setCNPJ(response.data.cnpj)
                         setCliente(response.data);
                        console.log(response.data);   
                          }
      )
      .catch((err) => {
         console.error("erro ao listar");
      }); 
    
      }


//Salvar Edição e Mensagem de Alerta
      async function editar() {
        console.log('clicou no editar');
    
        const response = await axios.put('http://localhost:3001/clientes/' + id, {
            logradouro,
            numero,
            bairro,
            cidade,
            uf,
        });
        try {
          const response = await axios.put(`http://localhost:3001/clientes/${id}`, data);
          if (response.status === 200) {
            toast.current.show({
              severity: "success",
              summary: "Sucesso",
              detail: "Cliente atualizado com sucesso!",
              life: 3000
            });
          } else {
            toast.current.show({
              severity: "error",
              summary: "Erro",
              detail: "Erro ao atualizar o Cliente",
              life: 3000
            });
          }
        } catch (err) {
          console.error("Erro ao atualizar Cliente:", err);
          toast.current.show({
            severity: "error",
            summary: "Erro",
            detail: "Erro ao atualizar o Cliente: " + err.message,
            life: 3000
          });
        }
      }
// Cadastro de Propriedade

    const [visible, setVisible] = useState(false);
    function salvarPropriedade(propriedades){
        console.log("Clicou no gravar");

        const api = axios.create({
            baseURL: "http://localhost:3000",
        })
        //inserindo dados

        api.post(`http://localhost:3001/enderecos`, {
            logradouro,
            numero,
            bairro,
            cidade,
            uf,
            cliente
        
        }).then(() => {
            toast.current.show({ severity: 'success', summary: 'Mensagem de sucesso', detail: 'Propriedade Salva!' });
        }).catch(() => {
            toast.current.show({severity: 'error', summary: 'Erro', detail: 'Ocorreu um erro ao Salvar.'})
        });
    }


//Inteface
    return(
        <div className="card flex justify-content-center mt-4">
            <Card title="">
                <h4 className="m-0">Editando Colaborador Nº {id}</h4>
            </Card>
            <Toast ref={toast}></Toast>


            <Dialog header="Cadastrar Propriedade" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
                <div className="p-col-4 p-md-4">
                    <div className="p-inputgroup">
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-home"></i>
                        </span>
                        <InputText placeholder="Logradouro" value={logradouro} onChange={(e) => setLogradouro(e.target.value)}/>
                    </div>
                    <div className="p-inputgroup">
                        <span className="p-inputgroup-addon">
                            Nº
                        </span>
                        <InputNumber placeholder="Numero" value={numero} onValueChange={(e) => setNumero(e.value)}/>  
                    </div>
                    <div className="p-inputgroup">
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-building"></i>
                        </span>
                        <InputText placeholder="Bairro" value={bairro} onChange={(e) => setBairro(e.target.value)}/>
                    </div>
                    <div className="p-inputgroup">
                        <span className="p-inputgroup-addon">
                            <i className="pi pi pi-home"></i>
                        </span>
                        <InputText placeholder="Cidade" value={cidade} onChange={(e) => setCidade(e.target.value)}/>
                    </div>
                    <div className="p-inputgroup">
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-map"></i>
                        </span>
                        <Dropdown value={uf} onChange={(e) => setUf(e.value)} options={options} optionLabel="label" 
                            placeholder="Selecione Estado" className="w-full md:w-14rem" />
                    </div>
                    <Button label="Salvar" raised onClick={()=> salvarPropriedade(history)}/>
                </div>
            </Dialog>


            


            <div className="p-col-4 p-md-4">
                    <div className="p-inputgroup">
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-user"></i>
                        </span>
                        <InputText placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)}/>
                    </div>
                </div>
                <div  className="p-col-4 p-md-4">
                    <div className="p-inputgroup">
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-phone"></i>
                        </span>
                        <InputMask id="Telefone" mask="(999) 99999-9999" placeholder="(000) 00000-0000" value={telefone} onChange={(e) => setTelefone(e.target.value)}></InputMask>
                    </div>
                </div>
                <div  className="p-col-4 p-md-4">
                    <div className="p-inputgroup">
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-id-card"></i>
                        </span>
                        <InputMask id="CNPJ" mask="99.999.999/9999-99" placeholder="00.000.000/0000-00" value={cnpj} onChange={(e) => setCNPJ(e.target.value)} autoComplete="off"></InputMask>
                    </div>
                </div>

                <div className=" flex flex-wrap justify-content-center gap-3 ml-auto">
                    <Button label="Nova Propriedade" raised onClick={()=> setVisible(true)} style={{margin: '10px', backgroundColor: 'gray'}}/><br/>
                    <Button label="Salvar" raised onClick={()=> editar(history)}/>
                    <Link to="/Paginas/ListaCliente"> 
                        <Button label="Cancelar"  raised className="buton-cancel"/>
                    </Link>
                </div>
        </div>
        
    )
}